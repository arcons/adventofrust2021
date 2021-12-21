use std::fs::File;
use std::io::BufReader;
use std::io::BufRead;

fn main() {
  // --snip--
  // let args: Vec<String> = env::args().collect();

  // let query = &args[1];
  // let filename = &args[2];

  // println!("Searching for {}", query);
  // println!("In file {}", filename);

  let contents = load_from_file("./inputs/test.txt");
  // let part1Answer =  part1(contents);
  // println!("Part 1 {}", part1Answer);
  let part2Answer =  part2(contents);
  println!("Part 2 {}", part2Answer);
}

#[derive(Debug)]
struct Command {
}

fn part1(input: Vec<i32>) -> i32 {
  return -1
}

fn part2(input: Vec<i32>) -> i32 {
  return -1
}

fn load_from_file(file_path: &str) -> Vec<i32> {//, vec<vec<i32>>) {
  let file = File::open(file_path).expect("file wasn't found.");
  let reader = BufReader::new(file);

  let mut lines: Vec<String> = reader
      .lines()
      .map(|line| line.expect("Could not parse line"))
      .collect();
  let mut firstLine = &lines[0];
  println!("firstLine {:?}", firstLine);
  lines.remove(0);
  println!("lines {:?}", lines);
  let numbers: Vec<i32> = Vec::new(); //= firstLine.pop().map(|line| line.split(',').unwrap().parse::<i32>()).collect();

  let mut commands = Vec::new();
  for line in lines {
      let mut split = line.split_whitespace();
      let dir = split.next().unwrap();
      // println!("dir {:?}", dir);
      let num = split.next().unwrap().parse::<i32>().unwrap();
      // println!("num {:?}", num);
      let new_command = {Command {direction: dir.to_string(), number: num}};
      commands.push(new_command);
    // let com = line.split_whitespace().next().next();
  }
  println!("numbers {:?}", numbers);
  
  return numbers;
}